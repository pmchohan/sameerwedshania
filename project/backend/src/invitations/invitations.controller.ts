import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller()
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  /**
   * Public: Resolves /:code for the invitation card frontend.
   * GET /api/invitations/:code
   */
  @Get('invitations/:code')
  async getByCode(@Param('code') code: string) {
    const invitation = await this.invitationsService.findByCode(code);
    return {
      success: true,
      invitation,
    };
  }

  /**
   * Admin: List invitations with optional search query & event filter.
   * GET /api/admin/invitations?q=...&event=...
   */
  @Get('admin/invitations')
  async listAll(
    @Query('q') search?: string,
    @Query('event') event?: string,
  ) {
    const data = await this.invitationsService.findAll(search, event);
    return {
      success: true,
      total: data.length,
      data,
    };
  }

  /**
   * Admin: Create a new invitation (auto-generates code if omitted).
   * POST /api/admin/invitations
   */
  @Post('admin/invitations')
  async create(@Body() dto: CreateInvitationDto) {
    const created = await this.invitationsService.create(dto);
    return {
      success: true,
      data: created,
    };
  }

  /**
   * Admin: Get single invitation details.
   * GET /api/admin/invitations/:id
   */
  @Get('admin/invitations/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.invitationsService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  /**
   * Admin: Update invitation.
   * PUT /api/admin/invitations/:id
   */
  @Put('admin/invitations/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInvitationDto,
  ) {
    const updated = await this.invitationsService.update(id, dto);
    return {
      success: true,
      data: updated,
    };
  }

  /**
   * Admin: Delete invitation.
   * DELETE /api/admin/invitations/:id
   */
  @Delete('admin/invitations/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.invitationsService.remove(id);
  }
}
