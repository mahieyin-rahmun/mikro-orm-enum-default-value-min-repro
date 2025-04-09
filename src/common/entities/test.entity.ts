import {
  Entity,
  Enum,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

export enum EState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity({
  tableName: 'tests',
})
export class TestEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey({ autoincrement: true })
  id: string;

  @Property({ type: 'string' })
  name: string;

  @Enum({ items: () => EState })
  state: EState;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
