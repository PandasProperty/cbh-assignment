const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;

exports.createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey && typeof event.partitionKey === "string") {
    candidate = event.partitionKey;

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = this.createHash(candidate);
    }

    return candidate;
  }

  const data = JSON.stringify(event);
  candidate = this.createHash(data);

  return candidate;
};