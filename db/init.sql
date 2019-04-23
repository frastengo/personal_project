drop table if exists profiles;
drop table if exists users;

create table users(
    user_id serial primary key,
    password text,
    email text,
    name text,
)

insert into users (password, email, name) 
values ('hello', 'frastengo@gmail.com', 'Francisca');






create table profiles(
    user_id integer references users(user_id),
    profile_id serial primary key,
    name text not null,
    breed text,
    gender text,
    image text,
    favorites text,
    country text,
    city text,
    state text,
    zipcode integer
);

insert into profiles (user_id, name, breed, gender, image, favorites, country, city, state, zipcode)
values (1, 'Batman', 'Pitbull', 'Male', '6 months old', 'Bitting and snacks', 'https://lh3.googleusercontent.com/MNtG2WW6wsDFVmByAqTfC8MXOj1XUZYeGBWUzdIShxc7nctgALwj4obuQ3VQEsioSOexMvBZTGMkliAapgyBZEWLHVHpJryIJCo-Nv-KnLI4qf8LRqHCFxv9LdthTpNJsCWvLA0e0SOu7t4ZxYrd5vloFgw1XvORU0_tIeSJYi-U7_SR8gYGOvdTK0PBtRDJIPJHXH-CKyPVmwX7NkmWo31dA3U9vNXFFIgcF_QR1KGSfbS8D7zCKtPrzXE6791jRiEnhexdDhlWSYx9nGWzVBucInNQ9VqUA7-0ImPv7g1_Y2NJRkhOAHHmR1ruyDku8a9tja0ucWo2mLbB7aNht_-xE_ZecsIJtbt5LvKrCo-HnKau18dSgo15tyd4K_AFiH1yAnsVATSdlj6RHgPUYI7TEWfPd7W7zF2bKa9BPKRW9NBYxkxmy3PabX7SEd3PyxkqTBmFym9momK3m04-SFbWIGGownF7H9scjHSJI82UCOGAIKM6j3uccMy7HUcDcfo3VzbQFy-ugkgEk2ol6MfPTMckpSGyfRtwuhyHSJMzLGShM0QImwVdSs9hmRHkoNZ3sOltA-t8c4jUD1dmjwDg6L_nw16nuXdfdsPYDpNQk0Rx8fuMYGUOTJclfHt4DJ7_utOdgCD_BgrRwyO_7XVk1OjhH08=w575-h766-no', 'Phoenix', 'AZ', 85054), (1, 'Iggy', 'English Bulldog', 'Female', '4 years old', 'Napping and walks', 'https://lh3.googleusercontent.com/Yi2U24IRtl7q-120giGZWsHzjN8wNdcct6OXHMV8MLGUFNsmyvUBU6Rfi3kw0Df-TP5AbzF_DWHha8wtIf9_7elTWynT7G_j05N-bWQrBwaoYSaz3K2-8fgYiYB4DB99dyd24Q-oi9fxaIKNsgMSEq1d2SyCSNG9YdTapH6OTVyuc5SWOd8oImrrszoP4vD-C8nbWddT74JO6a3sXxdkzVmdeWbkID-uZzV6iAy2_qQMWr_11Sfoc-LuQj6Jcy6vU1PQI6S5LkxKk7B8acdcO9H-oC3VAkUV8oQ8ZAKVC_UMy1Cux6plQYixUWv0EttQ5scf5iHnicQJ9WYAbqjohGYy-5sbRZ1wGgHAEuFIMuRWJSkv4ffqL1CO3p5BHWbonpgbRkVAtN0t3RdH5xgb_1KUkigzJ0BN2QzLuEV1keMNHhfiIi1nIvARa2l5t0FG5xB66hytT6opBZ_GsX99IC5bbJavA3A4jYsJ4aPMJokFywDNs6C9pYvrngROEM6PKU5wrCyLlhNgF8WSxfsfyiZIZr8D-Tszj9rtCehdfubCnJPj4mo9mhgnnEgygoAqn5Cu13KpDs8ahuvedGIgqyFJo5M4rXl1MlNR6b-9ucmEQi-5taFNeRr9JDls1clBd2DPOWGdF4Npc66sPbEcRhN1zBPEa24=w741-h737-no', 'Salt Lake City', 'Utah', 85054), (1, 'Nala', 'GoldenDoodle', 'Female', '2 years old', 'Wearing bandanas', 'https://lh3.googleusercontent.com/FnqsDEb1zSKwyaSVgQL_J3Bz2WdKmPtqFhVg1We-Nj-C-DLQ1B-CsYLZU1dBWtHGwssQAaTB1N7MMqjV-WyoKkhT_70sHZQ5_XVrKQU8KAJtD9EDBBGXn5nWknqTiaSDatqdxVtDEfYhbWUBJ1oM99DApJ6X_RR6gNMxYAwJG-sjDJUkmSd-DNXsgYZE1IXrP7xDuD0M5-iNIrCq3w9RK_bv2ylowczuTOzvhoxt15BCX8hiwOFvyXQPk1JIMAC2HNpqIu2PbmXVyaXiIRwvrXplNanrYmXLEhlCToxd_U0VBGMlPI-nonXE9fH2Yil6dt4SHRLDwTqq82eSRIgNx9L43bwCr_V6XFOM08a90zJ66J9jUWXPGvplnndnyrGhbqMd4NT1UsZuPHbWE_-mc7fGEYdmu_zScsUK5EaPKkfERg0GL-d3Y8Yx107wE0NImm5mGRmEA7Qi5ko5sAbc45-mdkcJlS1wPYrJfjhyPsmx1kuMCpARmcU7q5FCgTzYjhqlN-YymyM0e5-6zSG4W2XSvTPk0vwpIi1-Wrwa1sYsKsn7vXbAuI52fUnI8RRMOyiV4IwYZMb5gQMIzVzR9f9aKO9xu3nm6qj8Wa7mKkQYClFQHTBi6i-Wwdu7ietonF982NmQTkt_FE9HbP5rUb8dlrVFgdc=w555-h740-no', 'Phoenix', 'Arizona', 85054),
(1, 'Dutchie', 'French Bulldog', 'Male', '1 years old', 'Hyper', 'https://lh3.googleusercontent.com/02VVxkVVEPpx4DwrII1H714FQZrTzN0An5OIqU7rozQobTliE1JEkSAYTIEbYNFO_f9F9HkffOB7o0qIUIMVjXHfPb9BcgLjx66f2_M5SLLMnydNKlh1R6siYuOdjXPMGIOsOTFub_tinbMuTqauB8GZ2JfoaAiQM383ocIZYrkwVd8IGnIVSsAXhn2zVzEJYHxx3JgMsVz3PDeQe57ckWgWZUNtNY8OHlBXNArJPyD5Wzi0HY0ItK7uXAnqw6BWzb21SMJhSNbUFosgnfZhN_Nd-f-iN18o3Ct9QV5fa4Xhjm2uXLK38W5P_FtUfvtEl8gy-UoZlFlB1RT_sKZVmc1uHCMZtPwrjlCTkrga7SEnz_KsD5mSgFQgf-YSpOyc8exqgDOaZc_wygOuYW5I8XGnkyyBnyAnc5T7AQO1W3V0pgqsDd1_vUo73C05hgC4sHvXN6InhBfmJte4YTqnJHC22VA3kNS1nGrdbBl9JqCLKOFDCsVVFOsZfw-J8tbGTMubPCWCYXatoG0C965HW-v1OnEhtuww5opubuUBLpA2bk89ai8PgIT5TfDZUrdVb_UqRcW4yK6xK447KHJXolpV9K6eHjWn8oZGnG-uAd9M4i2h5KcB7FKBaMrsGb3uW09clQAMX6nwBvNLItEI4xWgUwv0TkU=w750-h725-no', 'Phoenix', 'Arizona', 85054);




-- create table messages(
--     message_id serial primary key,
--     message text not null,
--     profile_id integer references profiles(profile_id)
-- )