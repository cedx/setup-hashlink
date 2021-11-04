# Usage

## Inputs
By default, this action will install the latest release of the [HashLink VM](https://hashlink.haxe.org) corresponding to the current host platform.  
You can customize the downloaded release with the following inputs:

### **version**: string
The version number of the HashLink VM (optional, defaults to `"latest"`).  
Allowed values are:
- `latest`: the latest release of the virtual machine.
- a specific version number: `1.0.0`, `1.11.0`, etc.

## Setup
?> A complete workflow can be found in this [workflow.yaml](https://github.com/cedx/setup-hashlink/blob/main/example/workflow.yaml) file.

### Basic
Setup a specific version of the HashLink VM:

```yaml
jobs:
	test:
		runs-on: windows-latest
		steps:
			- uses: actions/checkout@v2
			- uses: lix-pm/setup-lix@master
			- uses: cedx/setup-hashlink@v1
				with:
					version: 1.11.0
			- run: hl --version
			- run: lix download
			- run: haxe test.hxml
```

### Matrix
Setup multiple versions of the HashLink VM on multiple operating systems:

```yaml
jobs:
	test:
		name: HashLink VM ${{matrix.version}} on ${{matrix.platform}}
		runs-on: ${{matrix.platform}}
		strategy:
			matrix:
				platform: [ubuntu-latest, windows-latest]
				version: [1.0.0, latest]
		steps:
			- uses: actions/checkout@v2
			- uses: lix-pm/setup-lix@master
			- uses: cedx/setup-hashlink@v1
				with:
					version: ${{matrix.version}}
			- run: hl --version
			- run: lix download
			- run: haxe test.hxml
```
