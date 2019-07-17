<?php

/**
 * Class Webpage
 */
class Webpage{
	protected $head;
	protected $body;
	protected $foot;

    /**
     * Webpage constructor.
     * @param string $title
     * @param array $styles
     */
	function __construct($title="New Page", array $styles){
		$this->makeHead( $title, $styles );
		$this->foot = "\n</body></html>";
		$this->body = "";
	}

    /**
     * @param $text
     */
	function addToBody( $text ){
		$this->body .= $text;
	}

    /**
     * @return string
     */
	function getPage(){
		return $this->head . $this->body . $this->foot;
	}

    /**
     * @param $title
     * @param array $styles
     */
	private function makeHead( $title, array $styles ){
		$stylelinks = "";
		foreach($styles as $style){
			$stylelinks .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"$style\" />\n\t";
		}
		// this is a good way of assigning lots of formatted text that contains quotes to a variable, it saves you having to escape the quotes.
		// you have to include the <<<WORD and then end the assignment with WORD; on its own line not indented.  It's called a 'heredoc', look it up.
		$this->head = <<<HEAD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">
<head>
	<title>$title</title>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
	$stylelinks
</head>
<body>

HEAD;
	}
}

?>