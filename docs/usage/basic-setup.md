# Basic setup
Setup a specific version of the [HashLink VM](https://hashlink.haxe.org):

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: lix-pm/setup-lix@master
      - uses: cedx/setup-hashlink@v4
        with:
          version: 1.13.0
      - run: hl --version
      - run: lix download
      - run: haxe test.hxml
```
