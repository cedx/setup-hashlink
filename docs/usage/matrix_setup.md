# Matrix setup
Setup multiple versions of the [HashLink VM](https://hashlink.haxe.org) on multiple operating systems:

```yaml
jobs:
  test:
    name: HashLink VM ${{matrix.version}} on ${{matrix.platform}}
    runs-on: ${{matrix.platform}}
    strategy:
      matrix:
        platform: [ubuntu-latest, windows-latest]
        version: [1.x, latest]
    steps:
      - uses: actions/checkout@v4
      - uses: lix-pm/setup-lix@master
      - uses: cedx/setup-hashlink@v4
        with:
          version: ${{matrix.version}}
      - run: hl --version
      - run: lix download
      - run: haxe test.hxml
```
