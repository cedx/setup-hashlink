package setup_hashlink;

/** Defines the platform of the HashLink VM. **/
enum abstract Platform(String) from String to String {

	/** Specifies a Linux platform. **/
	var Linux = "Linux";

	/** Specifies a macOS platform. **/
	var MacOS = "Mac";

	/** Specifies a Windows platform. **/
	var Windows = "Windows";
}
