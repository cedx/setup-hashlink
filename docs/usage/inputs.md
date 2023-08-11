# Inputs
By default, this action will install the latest stable release of the [HashLink VM](https://hashlink.haxe.org) corresponding to the current host platform.  
You can customize the downloaded release with the following input:

## **version**: string
The version constraint of the HashLink VM (optional, defaults to `latest`).  
Allowed values are:

- `latest` or `*`: the latest stable release of the virtual machine.
- a loose version number: `1.0.0`, `1.13.0`, etc. It's equivalent to the caret `^` operator: `^1.0.0`, `^1.13.0`, etc.
- a strict version number: `=1.0.0`, `=1.13.0`, etc.
- a version specification: `1.10.x`, `>=1.0.0 <1.13.0`, `=1.0.0 || ^1.10.0`, etc.

> The version constraint follows the syntax and semantics of the [tink_semver](https://lib.haxe.org/p/tink_semver) package.
