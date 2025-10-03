import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Space } from 'src/modules/space/entities/space.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';

@Table({ tableName: 'space_types' })
export class SpaceType extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Space)
  spaces: Space[];

  @HasMany(() => Subject)
  subjects: Subject[];
}
