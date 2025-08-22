function check() {
  var metadataMap = workflowData.getMetaDataMap();
  var dataErrors = metadataMap.get("dataErrors");
  if (dataErrors != null && typeof dataErrors.size === 'function'){
    var errorCount = dataErrors.size();
    log.info("dataErrors size = " + errorCount);
    return errorCount === 0; // Directly return boolean value
  }
  log.info("dataErrors is null or not set in metadata.");
  return true; // Return false if dataErrors is null or does not have a size method
}

function check() {
  var metadataMap = workflowData.getMetaDataMap();
  var dataErrors = metadataMap.get("dataErrors");
  if (dataErrors != null && typeof dataErrors.size === 'function'){
    var errorCount = dataErrors.size();
    log.info("dataErrors size = " + errorCount);
    return errorCount === 0; // Directly return boolean value
  }
  log.info("dataErrors is null or not set in metadata.");
  return false; // Return false if dataErrors is null or does not have a size method
}
