extension mjs tells to use the ecmascript modules

-e to evaluate as a string. Generating a file 
node -e "process.stdout.write(crypto.randomBytes(1e9))"
to save this generated string in a file - > big.file
final command - node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file