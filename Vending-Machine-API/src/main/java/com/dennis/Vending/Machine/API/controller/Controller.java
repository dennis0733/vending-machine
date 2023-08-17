package com.dennis.Vending.Machine.API.controller;

import com.dennis.Vending.Machine.API.exception.ItemNotFoundException;
import com.dennis.Vending.Machine.API.model.Admin;
import com.dennis.Vending.Machine.API.model.Item;
import com.dennis.Vending.Machine.API.repository.AdminRepository;
import com.dennis.Vending.Machine.API.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class Controller {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AdminRepository adminRepository;


    //Getting all items in list
    @GetMapping("/items")
    List<Item> getAllItems(){
        return itemRepository.findAll();
    }



    //comparison operation for password
    @GetMapping (value = "/password/{pswd}")
    Boolean matchPassword(@PathVariable String pswd) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {

        String password = adminRepository.getReferenceById(Long.valueOf(0)).getPassword();
        if(hashIt(pswd).equals(password)){
            return true;
        }
        else{
            return false;
        }

    }

    //updating price
    @PutMapping("/updateprice/{id}/{val}")
    Item updatePrice(@PathVariable Long id,@PathVariable Long val){
    if(val == null){
        throw new NullPointerException();
    }
        return itemRepository.findById(id)
                .map(item ->{
                    item.setPrice(val);
                    return itemRepository.save(item);
                }).orElseThrow(()-> new ItemNotFoundException());


    }

    //adding more item(increasing quantity)
    @PutMapping("/updatequantity/{id}/{val}")
    Item updateQuantity(@PathVariable Long id,@PathVariable Long val){
        if(val == null){
            throw new NullPointerException();
        }

        return itemRepository.findById(id)
                .map(item ->{
                    item.setQuantity( val + item.getQuantity());
                    return itemRepository.save(item);
                }).orElseThrow(()-> new ItemNotFoundException());


    }

    //Getting total money for owner
    @GetMapping("/totalmoney")
    Long getMoney(){
        Long money = adminRepository.getReferenceById(Long.valueOf(0)).getTotalmoney();
        return money;
    }

    //add money for purchase and remove money for cashout
    @PutMapping("/updatemoney/{val}")
    Admin updateMoney (@PathVariable Long val){
    Long control = adminRepository.getReferenceById(Long.valueOf(0)).getTotalmoney();

    if(-1*val > control){

        throw new ItemNotFoundException();
    }

         return adminRepository.findById(Long.valueOf(0))
                 .map(admin ->{
                     admin.setTotalmoney( val + admin.getTotalmoney());
                     return adminRepository.save(admin);
                 }).orElseThrow(()-> new ItemNotFoundException());


    }

    //Password hash function
    String hashIt( String pswd) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        String plainText = pswd;
        String secretKey = "MySecretKey12345"; // 16 bytes for AES

        // Create a secret key
        Key key = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "AES");

        // Create a cipher instance and initialize it for encryption
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key);

        // Encrypt the string
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

        // Convert the encrypted bytes to Base64-encoded string
        String encryptedString = Base64.getEncoder().encodeToString(encryptedBytes);



        return encryptedString;
    }
}
