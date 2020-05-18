<?php
//post class
class post
{
	//post class fields
	private $ID;
	private $Date;
	private $Title;
	private $post;
	private $likes;
	private $dislikes;

	//post class constructor
	public function __construct($ID, $Date, $Title, $post, $likes, $dislikes)
	{
		$this->ID = $ID;
		$this->Date = $Date;
		$this->Title = $Title;
		$this->post = $post;
		$this->likes = $likes;
		$this->dislikes = $dislikes;
	}

	//post class getters
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
