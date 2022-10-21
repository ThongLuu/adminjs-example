import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  createConnection,
  ManyToOne,
  RelationId
} from "typeorm";
import express from "express";
import { Database, Resource } from "@adminjs/typeorm";
import { validate } from "class-validator";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

Resource.validate = validate;
AdminJS.registerAdapter({ Database, Resource });

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public firstName: string;

  @Column({ type: "varchar" })
  public lastName: string;

  // For fancy clickable relation links:
  public toString(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

(async () => {
  const connection = await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Person],
    synchronize: true,
    logging: false
  });

  // Applying connection to model
  Person.useConnection(connection);

  const adminJs = new AdminJS({
    // databases: [connection],
    resources: [{ resource: Person, options: { parent: { name: "foobar" } } }],
    rootPath: "/"
  });

  const app = express();
  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
  app.listen(3000);
})();
