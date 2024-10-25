package hashlink;

/** Defines the operating system or platform of the HashLink VM. **/
enum abstract OperatingSystem(String) from String to String {

	/** Specifies a Linux platform. **/
	var Linux;

	/** Specifies a macOS platform. **/
	var MacOs = "Mac";

	/** Specifies a Windows platform. **/
	var Windows;
}
