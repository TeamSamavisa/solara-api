import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Assignment } from 'src/modules/assignment/entities/assignment.entity';
import { SpaceType } from 'src/modules/space-type/entities/space-type.entity';

@Table({ tableName: 'spaces' })
export class Space extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  floor: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  blocked: boolean;

  @ForeignKey(() => SpaceType)
  @Column(DataType.INTEGER)
  space_type_id: number;

  @BelongsTo(() => SpaceType)
  spaceType: SpaceType;

  @HasMany(() => Assignment)
  assignments: Assignment[];
}
