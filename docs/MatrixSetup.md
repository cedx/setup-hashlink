# Matrix Setup
Setup multiple versions of [Apache Ant](https://ant.apache.org) on multiple operating systems:

```yaml
jobs:
  test:
    name: Apache Ant ${{matrix.version}} on ${{matrix.platform}}
    runs-on: ${{matrix.platform}}
    strategy:
      matrix:
        platform: [ubuntu-latest, windows-latest]
        version: [<=1.9, latest]
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-java@v5
        with:
          distribution: temurin
          java-version: 25
      - uses: cedx/setup-ant@v6
        with:
          optional-tasks: true
          version: ${{matrix.version}}
      - run: ant -version
```
