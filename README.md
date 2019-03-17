# eKYC - KYC without Aadhar

# PROBLEM STATEMENT:
Knowing your customer compliance in emerging and developing markets is a big challenge - yet today's digital age: mapping an individual's identity is a necessary step to unlock an individual's full value.
Considering the recent supreme court mandate to make Aadhaar based Know Your Customer (KYC) non-mandatory all private players need to change their approach to non Aadhaar based KYC. The mandate is to collect documents Proof of Identity (POI) and Proof of Address (POA), digitize them and ensure that the identity of the person applying for the service is verified.

# SOLUTION: 
Our Solution is a 3 way system that includes consent of citizen, verification from the government and the third party organization that requires KYC. 

# PROPOSED IDEA:
1. The citizen will register via the app, fill in the details and upload the documents (POA and POI).
2. Server will encrypt the details and the documents and store the key in blockchain.
3. the government will take the key from blockchain, decrypt the details and documents and verify through the web portal.
4. Once verified the citizen will be considered an Eligible for KYC citizen.
5. The citizen can now apply for their KYC.
6. Once they apply to any Organization, the organization will have to request the server to grant them access.
7. The server will verify the authenticity of organization and ask the citizen for consent.
8. Once the consent is given, the server will grant access of the documents to the organization.

# SHOW STOPPERS:
-> The system would leverage OCR, facial recognition to verify users with minimum human intervention.

-> The Data of the citizen cannot be tempered with hence remains secured.

-> If any suspicious activity is found, The transactions can be backtracked easily.
