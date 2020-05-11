<?php
class post
{
  private $ID;
  private $Date;
  private $Title;
  private $post;
  private $likes;
  private $dislikes;

  public function __construct($ID, $Date, $Title, $post, $likes, $dislikes)
  {
    $this->ID = $ID;
    $this->Date = $Date;
    $this->Title = $Title;
    $this->post = $post;
    $this->likes = $likes;
    $this->dislikes = $dislikes;
  }

  public function getID()
  {
    return $this->ID;
  }
  public function getTitle()
  {
    return $this->Title;
  }
}
 ?>
