<?php

/**
 * Class R_RecordSet
 */
abstract class R_RecordSet {
protected $db;
protected $stmt;

    /**
     * R_RecordSet constructor.
     */
function __construct() {
$this->db = SQLiteConnection::getConnection();
}

    /**
     * @param $sql
     * @param string $elementName
     * @param null $params
     * @return bool|false|PDOStatement
     */
function getRecordSet($sql, $elementName = 'ResultSet', $params = null) {
if (is_array($params)) {
$this->stmt = $this->db->prepare($sql);
// execute the statement passing in the named placeholder and the value it'll have
$this->stmt->execute($params);
}
else {
$this->stmt = $this->db->query($sql);
}
return $this->stmt;
}
}

/**
 * Class JSONRecordSet
 */
class JSONRecordSet extends R_RecordSet {
    /**
     * @param $sql
     * @param string $elementName
     * @param null $params
     * @return bool|false|PDOStatement|string
     */
function getRecordSet($sql, $elementName = "ResultSet", $params = null) {
$stmt     = parent::getRecordSet($sql, 'notneeded', $params);
$recordSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
$nRecords = count($recordSet);
if ($nRecords == 0) {
$status = 'error';
$message = array("text" => "No records found");
$result = '[]';
}
else {
$status = 'ok';
$message = array("text" => "");
$result = $recordSet;
}
return json_encode(
array(
'status' => $status,
'message' => $message,
"$elementName" => array(
"RowCount"=>$nRecords,
"Result"=>$result
)
),
JSON_NUMERIC_CHECK, JSON_PRETTY_PRINT
);
}
}