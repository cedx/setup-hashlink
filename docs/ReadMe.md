# Setup HashLink VM
Set up your [GitHub Actions](https://docs.github.com/en/actions) workflow 
with a specific version of [Apache Ant](https://ant.apache.org).

## Getting started
If you haven't used GitHub Actions before, be sure to check out the [related documentation](https://docs.github.com/en/actions/quickstart), 
as it explains how to create and configure a workflow.

Setup Apache Ant in a workflow:

```yaml
steps:
  - uses: cedx/setup-ant@v6
  - run: ant -version
```

> [!NOTE]
> A sample workflow can be found in this [workflow.yaml](https://github.com/cedx/setup-ant/blob/main/example/workflow.yaml) file.

## Usage
- [Inputs](Inputs.md)
- [Basic setup](BasicSetup.md)
- [Matrix setup](MatrixSetup.md)
