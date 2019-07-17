<?php
// sets a global ERROR handler to be our function called exceptionHandler which
// converts an error into an exception
set_error_handler('errorHandler');
/**
 * receives an error, with its arguments, and converts it to an Exception
 * @param $errno
 * @param $errstr
 * @param $errfile
 * @param $errline
 * @throws ErrorException
 */
function errorHandler ($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        return;
    }
    throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
}
// set an exception handler that will fire if no catch block is found
set_exception_handler('exceptionHandler');
/**
 * a global exception handler that will fire if no catch block is found
 * @param $e
 */
function exceptionHandler ($e) {
    echo "<p><strong>Problem " . $e->getMessage() .
        ' in file ' . $e->getFile() .
        ', on line ' . $e->getLine() . "</strong></p>";
}
?>
