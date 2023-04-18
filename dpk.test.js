const { deterministicPartitionKey, createHash, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it(`Returns the given partition key when partitionKey is in the input event, it is a string and the length of it is less then ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const partitionKey = "my custom patition key";
    const candidate = deterministicPartitionKey({
      partitionKey: partitionKey
    });
    expect(candidate).toBe(partitionKey);
  });

  it(`Returns the given partition key when partitionKey is in the input event, it is a string and the length of it is equal to ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const partitionKey = Array(MAX_PARTITION_KEY_LENGTH).fill("a").join("");
    const candidate = deterministicPartitionKey({
      partitionKey: partitionKey
    });
    expect(candidate).toBe(partitionKey);
  });

  it(`Returns the hash of the given partition key when partitionKey is in the input event, it is a string and the length of it is greater then to ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const partitionKey = Array(MAX_PARTITION_KEY_LENGTH + 1).fill("a").join("");
    const candidate = deterministicPartitionKey({
      partitionKey: partitionKey
    });
    expect(candidate).toBe("5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785");
  });

  it(`Returns the hash of the event stringifyed when partitionKey is not in the input event, and the stringifies length of it is less then ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const event = {
      customField: "my custom patition key",
    }
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe("74f7d9d15ed48be9ab6ac85a5955f3c0028bee9416d417bb4974722f923376045fb911d457b6d89d8c011cac9a7d43025b36bc0b1b4fb0bd4858044aa11b7295");
  });

  it(`Returns the hash of the partitionKey stringified if the partitionKey is in the input event, and the partitionKey in an object  ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const event = {
      customField: "my custom patition key",
    }
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe("74f7d9d15ed48be9ab6ac85a5955f3c0028bee9416d417bb4974722f923376045fb911d457b6d89d8c011cac9a7d43025b36bc0b1b4fb0bd4858044aa11b7295");
  });
});

describe("createHash", () => {
  it("Does not return a string bigger then the given MAX_PARTITION_KEY_LENGTH", () => {
    const key1 = createHash('test');
    expect(key1.length).toBe(128);
    expect(key1.length <= MAX_PARTITION_KEY_LENGTH).toBe(true);

    const key2 = createHash(Array(MAX_PARTITION_KEY_LENGTH).fill("a").join(""));
    expect(key2.length).toBe(128);
    expect(key2.length <= MAX_PARTITION_KEY_LENGTH).toBe(true);

    const key3 = createHash(Array(2 * MAX_PARTITION_KEY_LENGTH).fill("a").join(""));
    expect(key3.length).toBe(128);
    expect(key3.length <= MAX_PARTITION_KEY_LENGTH).toBe(true);
  });
});