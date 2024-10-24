# employee_tracker_SQL

## What I Learned
- Gained hands-on experience with Node.js and Express for building a command-line application.
- Learned how to interact with a PostgreSQL database using the `pg` package.
- Improved skills in using the inquirer package for user interaction in the command line.
- Developed a deeper understanding of database schema design and relationships.

## Challenges Encountered
- **Database Connection Issues:** Initially faced problems connecting to the PostgreSQL database due to incorrect database names or configurations.
- **Implementing CRUD Operations:** Figuring out how to implement Create, Read, Update, and Delete (CRUD) operations for various entities (departments, roles, and employees) was challenging.
- **Foreign Key Constraints:** Encountered errors when trying to delete records that were referenced by foreign keys in other tables.

## Solutions
- **Database Connection:** Double-checked the database configuration and ensured the database was created and properly set up before running the application.
- **CRUD Operations:** Broke down the implementation into smaller, manageable functions. Tested each function individually to ensure they worked correctly.
- **Foreign Key Constraints:** Implemented checks to prevent deletion of records that are still referenced in other tables. For instance, before deleting a department, I ensured that no roles were associated with it.

## Walkthrough Video
You can view a demonstration of the application functionality in the following walkthrough video: [Walkthrough Video Link](https://drive.google.com/file/d/1QL9SVNXdWLZX_oWI3guISdBKiPpmWtDA/view?usp=drive_link)