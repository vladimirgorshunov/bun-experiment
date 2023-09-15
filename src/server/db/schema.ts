// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";

import {
  bigint,
  char,
  mysqlTableCreator,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `bun-startup-project_${name}`,
);

export const posts = mysqlTable(
  "posts",
  {
    id: char("id", { length: 25 })
      .primaryKey()
      .$defaultFn(() => nanoid(25)),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    content: varchar("content", { length: 256 }),
    authorId: char("author_id", { length: 25 }).notNull(),
  },
  (post) => ({
    authorIdIndex: uniqueIndex("author_id_index").on(post.authorId),
  }),
);
