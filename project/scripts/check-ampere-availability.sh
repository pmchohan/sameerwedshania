#!/usr/bin/env bash
# ==============================================================================
# Oracle Cloud Infrastructure (OCI) - Ampere A1 Flex Auto-Provisioner Script
# ==============================================================================
# In popular OCI regions, Always-Free Ampere A1 instances often show:
# "Out of host capacity" (500-InternalError or CapacityError).
#
# This script continuously attempts to launch an Ampere A1 Flex VM every 60s
# until Oracle allocates capacity in your Availability Domain.
#
# PREREQUISITES:
# 1. Install OCI CLI: bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"
# 2. Configure credentials: oci setup config
# 3. Fill in your Compartment ID, Subnet ID, and SSH Public Key below.
# ==============================================================================

set -euo pipefail

# --- CONFIGURATION (Fill these from your OCI Console) ---
COMPARTMENT_ID="${OCI_COMPARTMENT_ID:-ocid1.compartment.oc1..your_compartment_ocid}"
AVAILABILITY_DOMAIN="${OCI_AD:-}"  # e.g. "kldM:US-ASHBURN-AD-1"
SUBNET_ID="${OCI_SUBNET_ID:-ocid1.subnet.oc1..your_subnet_ocid}"
IMAGE_ID="${OCI_IMAGE_ID:-}"        # Ubuntu 24.04 aarch64 image OCID in your region
SSH_KEY_FILE="${HOME}/.ssh/id_rsa.pub"
INSTANCE_NAME="oracle-ampere-a1"

# Ampere A1 Flex: Up to 4 OCPUs and 24GB RAM are 100% Free Forever
OCPUS=4
MEMORY_IN_GBS=24
BOOT_VOLUME_GBS=50

echo "=== OCI Ampere A1 Availability Monitor & Auto-Provisioner ==="
echo "Target Shape: VM.Standard.A1.Flex (${OCPUS} OCPUs, ${MEMORY_IN_GBS}GB RAM)"

if [ ! -f "$SSH_KEY_FILE" ]; then
  echo "Error: SSH public key not found at $SSH_KEY_FILE"
  exit 1
fi

ATTEMPT=1
while true; do
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Attempt #$ATTEMPT: Requesting instance launch..."

  # Attempt launch
  OUT=$(oci compute instance launch \
    --compartment-id "$COMPARTMENT_ID" \
    --availability-domain "$AVAILABILITY_DOMAIN" \
    --shape "VM.Standard.A1.Flex" \
    --shape-config "{\"ocpus\":$OCPUS,\"memoryInGBs\":$MEMORY_IN_GBS}" \
    --display-name "$INSTANCE_NAME" \
    --image-id "$IMAGE_ID" \
    --subnet-id "$SUBNET_ID" \
    --ssh-authorized-keys-file "$SSH_KEY_FILE" \
    --boot-volume-size-in-gbs "$BOOT_VOLUME_GBS" \
    --assign-public-ip true \
    2>&1) || true

  if echo "$OUT" | grep -q '"lifecycle-state": "PROVISIONING"'; then
    echo " SUCCESS! Ampere A1 Flex instance has been successfully provisioned!"
    echo "$OUT"
    break
  elif echo "$OUT" | grep -iq "Out of host capacity"; then
    echo "  Out of host capacity in $AVAILABILITY_DOMAIN. Retrying in 60 seconds..."
  elif echo "$OUT" | grep -iq "TooManyRequests"; then
    echo "  Rate limited by OCI API. Waiting 120 seconds..."
    sleep 60
  else
    echo "  OCI API Response: $OUT"
  fi

  ATTEMPT=$((ATTEMPT + 1))
  sleep 60
done
