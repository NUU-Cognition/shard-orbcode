// OrbCode 1.0.2 -> 1.1.0: no change to the files of the Flint. This step keeps the migration chain complete.
// 1.1.0 changes the type files System, Module, Feature, and Data (a steel-type/1 block, and no capability has-claims).
// A type file installs once, so a Flint keeps its own copies. A copy that still names has-claims gives only a warning of the ITE.
process.exit(0);
