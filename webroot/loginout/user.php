<?php
//user class
class user{
	//user class fields
	private $userName;
  	private $DOB;
  	private $mail;
  	private $admin;

	//user class constructor
  	public function __construct($user,$dob,$mail,$admin){
    	$this->userName = $user;
    	$this->DOB = $dob;
    	$this->mail = $mail;
    	$this->admin = $admin;
  	}

	//user class getters
  	public function getUN(){
    	return $this->userName;
  	}
  	public function getAdmin(){
    	return $this->admin;
  	}
}
 ?>
