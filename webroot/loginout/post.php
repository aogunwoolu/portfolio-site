<?php
class post{
  private $ID;
  private $Date;
  private $Title;
  private $post;
  private $likes;
  private $dislikes;

  public function __construct($ID,$Date,$Title,$post,$likes,$dislikes){
    $this->$ID = $ID;
    $this->$Date = $Date;
    $this->$Title = $Title;
    $this->$post = $post;
    $this->$likes = $likes;
    $this->$dislikes = $dislikes;
  }

  public function getID(){
    return $this->ID;
  }
  public function getAdmin(){
    return $this->admin;
  }

  public function getDate()
  {
    return $this->Date;
  }


  public function getTitle()
  {
    return $this->Title;
  }

  public function setTitle($Title)
  {
    $this->Title = $Title;
  }


  public function getPost()
  {
    return $this->post;
  }

  public function setPost($post)
  {
    $this->post = $post;
  }

  public function getLikes()
  {
    return $this->likes;
  }

  public function getDislikes()
  {
    return $this->dislikes;
  }
}
 ?>
