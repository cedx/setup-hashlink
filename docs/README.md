# Setup HashLink VM
![Release](https://badgen.net/badge/action/v1.0.0/blue) ![License](https://badgen.net/badge/license/MIT/blue) ![Coverage](https://badgen.net/coveralls/c/github/cedx/setup-hashlink/main) ![Build](https://badgen.net/github/checks/cedx/setup-hashlink/main)

Set up your [GitHub Actions](https://docs.github.com/en/actions) workflow with a specific version of the [HashLink VM](https://hashlink.haxe.org).

!> This action only supports the **Ubuntu** and **Windows** platforms.  

## Getting started
If you haven't used GitHub Actions before, be sure to check out the [related documentation](https://help.github.com/en/actions), as it explains how to create and configure a workflow.

Setup the HashLink VM in a workflow:

```yaml
steps:
	- uses: cedx/setup-hashlink@v1
	- run: hl --version
```

For more details, see the [usage information](usage.md).
