import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

const CODE_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly repo: Repository<Invitation>,
  ) {}

  /** Generates an unambiguous random 6-character unique code */
  private async generateUniqueCode(): Promise<string> {
    for (let attempts = 0; attempts < 10; attempts++) {
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
      }
      const existing = await this.repo.findOne({ where: { code } });
      if (!existing) return code;
    }
    // Fallback timestamp suffix if collision occurs
    return (
      Math.random().toString(36).substring(2, 6) +
      Date.now().toString(36).substring(4, 6)
    );
  }

  async create(dto: CreateInvitationDto): Promise<Invitation> {
    let code = dto.code ? dto.code.trim().toLowerCase() : '';
    if (!code) {
      code = await this.generateUniqueCode();
    } else {
      const existing = await this.repo.findOne({ where: { code } });
      if (existing) {
        throw new ConflictException(`Invitation code "${code}" already exists`);
      }
    }

    const invitation = this.repo.create({
      ...dto,
      code,
      events: dto.events || ['mehndi', 'barat', 'walima'],
    });
    return this.repo.save(invitation);
  }

  async findAll(search?: string, eventFilter?: string): Promise<Invitation[]> {
    const query = this.repo.createQueryBuilder('invitation');

    if (search && search.trim()) {
      const term = `%${search.trim().toLowerCase()}%`;
      query.andWhere(
        '(LOWER(invitation.name) LIKE :term OR LOWER(invitation.code) LIKE :term OR invitation.nameUr LIKE :term)',
        { term },
      );
    }

    query.orderBy('invitation.createdAt', 'DESC');
    const items = await query.getMany();

    if (eventFilter && eventFilter.trim()) {
      const target = eventFilter.trim().toLowerCase();
      return items.filter((inv) =>
        inv.events && Array.isArray(inv.events)
          ? inv.events.map((e) => e.toLowerCase()).includes(target)
          : false,
      );
    }

    return items;
  }

  async findOne(id: number): Promise<Invitation> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Invitation #${id} not found`);
    }
    return item;
  }

  async findByCode(rawCode: string): Promise<Invitation> {
    const code = rawCode.trim().toLowerCase();
    const item = await this.repo.findOne({ where: { code } });
    if (!item) {
      throw new NotFoundException(`Invitation for code "${rawCode}" not found`);
    }
    return item;
  }

  async update(id: number, dto: UpdateInvitationDto): Promise<Invitation> {
    const item = await this.findOne(id);

    if (dto.code && dto.code.trim().toLowerCase() !== item.code) {
      const targetCode = dto.code.trim().toLowerCase();
      const existing = await this.repo.findOne({ where: { code: targetCode } });
      if (existing && existing.id !== id) {
        throw new ConflictException(`Code "${targetCode}" is already taken`);
      }
      item.code = targetCode;
    }

    if (dto.name !== undefined) item.name = dto.name;
    if (dto.nameUr !== undefined) item.nameUr = dto.nameUr;
    if (dto.events !== undefined) item.events = dto.events;
    if (dto.note !== undefined) item.note = dto.note;
    if (dto.noteUr !== undefined) item.noteUr = dto.noteUr;

    return this.repo.save(item);
  }

  async remove(id: number): Promise<{ success: boolean; id: number }> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { success: true, id };
  }
}
