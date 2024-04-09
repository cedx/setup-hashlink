# Inputs
By default, this action will install the latest stable release of the [HashLink VM](https://hashlink.haxe.org) corresponding to the current host platform.  
You can customize the downloaded release with the following input:

## **version**: string
The version constraint of the HashLink VM (optional, defaults to `latest`).  
Allowed values are:

- `latest` or `*`: the latest stable release of the virtual machine.
- a loose version number: `^1.0.0`, `~1.14.0`, etc.
- a strict version number: `1.0.0`, `=1.14.0`, etc.
- a version specification: `1.14.x`, `>=1.0.0 <1.14.0`, `=1.0.0 || ^1.14.0`, etc.

!!! tip
    The version constraint follows the syntax and semantics of the [semver](https://www.npmjs.com/package/semver) package.
