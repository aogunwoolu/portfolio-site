<?php
class user{
  private $userName;
  private $DOB;
  private $mail;
  private $admin;

  public function __construct($user,$dob,$mail,$admin){
    $this->userName = $user;
    $this->DOB = $dob;
    $this->mail = $mail;
    $this->admin = $admin;
  }

  public function getUN(){
    return $this->userName;
  }
  public function getAdmin(){
    return $this->admin;
  }
}
 ?>
