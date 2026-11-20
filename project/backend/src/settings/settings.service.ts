import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeddingSetting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(WeddingSetting)
    private readonly repo: Repository<WeddingSetting>,
  ) {}

  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    const item = await this.repo.findOne({ where: { key } });
    if (!item) return defaultValue;
    try {
      return JSON.parse(item.value) as T;
    } catch {
      return item.value as unknown as T;
    }
  }

  async setSetting<T>(key: string, value: T): Promise<void> {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    let item = await this.repo.findOne({ where: { key } });
    if (!item) {
      item = this.repo.create({ key, value: serialized });
    } else {
      item.value = serialized;
    }
    await this.repo.save(item);
  }

  async getAllSettings(): Promise<Record<string, any>> {
    const items = await this.repo.find();
    const result: Record<string, any> = {};
    for (const item of items) {
      try {
        result[item.key] = JSON.parse(item.value);
      } catch {
        result[item.key] = item.value;
      }
    }
    return result;
  }
}
