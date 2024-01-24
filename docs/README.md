# Setup HashLink VM
Set up your [GitHub Actions](https://docs.github.com/en/actions) workflow 
with a specific version of the [HashLink VM](https://hashlink.haxe.org).

## Getting started
If you haven't used GitHub Actions before, be sure to check out the [related documentation](https://docs.github.com/en/actions/quickstart), 
as it explains how to create and configure a workflow.

Set up the HashLink VM in a workflow:

```yaml
steps:
  - uses: cedx/setup-hashlink@v4
  - run: hl --version
```

## Usage
- [Inputs](usage/inputs.md)
- [Basic setup](usage/basic-setup.md)
- [Matrix setup](usage/matrix-setup.md)

> A sample workflow can be found in this [workflow.yaml](https://github.com/cedx/setup-hashlink/blob/main/example/workflow.yaml) file.

## See also
- [Learn GitHub Actions](https://docs.github.com/en/actions/learn-github-actions)
- [GitHub marketplace](https://github.com/marketplace/actions/setup-hashlink-vm)
- [API reference](api/)
