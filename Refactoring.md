# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- move the constants TRIVIAL_PARTITION_KEY and MAX_PARTITION_KEY_LENGTH outside of the function
- early return if there is no event
- extract a function for creating hash given a string
- if the event.partitionKey is always a string the 
      if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
      }
  doesn't make sense since the event was already stringify if there was no partitionKey in it
- if the partitionKey can be an object it gets stringified and if the length  is not bigger then 256 it doesn't get hashed, so I will assume that the event.partitionKey is always a hash and update the code.
- after the string gets hashed, based on documentation we won't need to check after length since createHash won't return a string bigger then 256 character (write a text function for this)
- i've also added test to verify the length of the hash if is always 128 so that other developer won't change the hash method by mistake and that is less then 256 sine I used the variable from the code MAX_PARTITION_KEY_LENGTH, not hardcoded 256 in the code