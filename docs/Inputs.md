# Inputs
By default, this action will install the latest stable release of [Apache Ant](https://ant.apache.org) and set accordingly the `ANT_HOME` environment variable.  
You can customize the downloaded release with the following inputs:

## **version**: string
The version constraint of Apache Ant (optional, defaults to `latest`).  
Allowed values are:

- `latest` or `*`: the latest stable release.
- a loose version number: `1`, `1.10`, etc. This is equivalent to using the `>=` operator.
- a strict version number: `=1.0.0`, `=1.10.0`, etc.
- a version specification: `<=1`, `>1.10`, etc.

> [!NOTE]
> The version constraint uses a very basic [syntax and algorithm](https://github.com/cedx/setup-ant/blob/main/src/Release.cs#L67), but it should suffice in most cases.  
> If this isn't enough, feel free to [open an issue](https://github.com/cedx/setup-hashlink/issues).

## **optional-tasks**: boolean
By default, the external libraries required by each of the [optional tasks](https://ant.apache.org/manual/install.html#optionalTasks) are not installed.
It's up to you to ensure that these libraries are properly added to Ant's class path.

You can automate this installation process by setting the `optional-tasks` input to `true`. This will run the following command after Ant has been set up:

```shell
ant -buildfile fetch.xml -Ddest=system
```
