// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTManager is ERC721URIStorage {
    address public admin;
    uint256 public animalCounter = 0;
    uint256 public actionCounter = 0;

    // Estructura que representa a un animal
    struct Animal {
        string name;         // Nombre del animal
        string breed;        // Raza del animal
        string animalType;   // Tipo de animal (por ejemplo, perro, gato)
        string photoURI;     // URI de la foto del animal
        uint256 birthYear;   // Año de nacimiento del animal
        bool exists;         // Verifica si el animal existe
    }

    // Estructura que representa una acción realizada a un animal
    struct AnimalAction {
        uint256 animalId;    // ID del animal
        string action;       // Acción realizada (vacunación, etc.)
        string metadataURI;  // URI de metadatos de la acción
    }

    // Mapear animales y acciones
    mapping(uint256 => Animal) public animals;
    mapping(uint256 => AnimalAction) public animalActions;

    event AnimalRegistered(uint256 animalId, string name, string breed, string animalType, string photoURI, uint256 birthYear);
    event NFTAwarded(uint256 tokenId, uint256 animalId, string action, string metadataURI);

    constructor() ERC721("AnimalCareNFT", "ACNFT") {
        admin = msg.sender;
    }

    // Función para registrar un nuevo animal
    function registerAnimal(string memory name, string memory breed, string memory animalType, string memory photoURI, uint256 birthYear) external {
        require(msg.sender == admin, "Only admin can register animals");
        uint256 animalId = animalCounter + 1;
        
        animals[animalId] = Animal(name, breed, animalType, photoURI, birthYear, true);
        animalCounter = animalId;
        
        emit AnimalRegistered(animalId, name, breed, animalType, photoURI, birthYear);
    }

    // Función para emitir un NFT basado en una acción realizada a un animal
    function issueNFT(
        uint256 animalId, 
        string memory action, 
        string memory metadataURI
    ) external {
        require(msg.sender == admin, "Only admin can issue NFTs");
        
        // Si el animal no existe, usa valores por defecto
        if (!animals[animalId].exists) {
            animalId = 1; // Valor por defecto para el ID del animal
            action = "vacunacion"; // Valor por defecto para la acción
            metadataURI = "ipfs://default-metadata-uri"; // Valor por defecto para la metadataURI
        }

        uint256 tokenId = actionCounter + 1;
        
        // Emitir el NFT
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);
        
        // Guardar la acción realizada
        animalActions[tokenId] = AnimalAction(animalId, action, metadataURI);
        
        actionCounter = tokenId;
        
        emit NFTAwarded(tokenId, animalId, action, metadataURI);
    }
}
