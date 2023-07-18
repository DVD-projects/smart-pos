package lk.dvd.my.api;

import lk.dvd.my.dto.CustomerDTO;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private BasicDataSource pool;

    @PostMapping
    public ResponseEntity<?> saveCustomer(@RequestBody CustomerDTO customer) {
        try(Connection connection = pool.getConnection()){
            PreparedStatement stm = connection.prepareStatement("INSERT INTO customer (name, address, contact_number) VALUES (?,?,?)", Statement.RETURN_GENERATED_KEYS);
            stm.setString(1, customer.getName());
            stm.setString(2, customer.getAddress());
            stm.setString(3, customer.getContactNumber());
            stm.executeUpdate();
            ResultSet generatedKeys = stm.getGeneratedKeys();
            generatedKeys.next();
            int id = generatedKeys.getInt(1);
            customer.setId(id);
            return new ResponseEntity<>(customer,HttpStatus.CREATED);
        }catch (SQLException e){
            if (e.getSQLState().equals("23000")){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }else{
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @GetMapping
    public ResponseEntity<?> getCustomers(@RequestParam(value = "q",required = false) String query) {
        if (query==null) query = "";
        query = "%" + query + "%";
        try(Connection connection = pool.getConnection()){
            List<CustomerDTO> customerList = new ArrayList<>();
            PreparedStatement stm = connection.prepareStatement("SELECT * FROM customer WHERE id LIKE ? OR  name LIKE ? OR " +
                    "address LIKE ? OR contact_number LIKE ?");
            for (int i = 1; i < 5; i++) {
                stm.setString(i,query);
            }
            ResultSet rs = stm.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String address = rs.getString("address");
                String contactNumber = rs.getString("contact_number");
                customerList.add(new CustomerDTO(id, name, address, contactNumber));
            }
            return new ResponseEntity<>(customerList,HttpStatus.OK);
        }catch (SQLException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") String customerId){
        System.out.println(customerId);
        try(Connection connection = pool.getConnection()){
            PreparedStatement stm = connection.prepareStatement("DELETE FROM customer WHERE id = ?");
            stm.setString(1,customerId);
            int affectedRows = stm.executeUpdate();
            if (affectedRows == 1){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }else{
                return new ResponseEntity<>("ID not found", HttpStatus.NOT_FOUND);
            }
        }catch (SQLException e){
            e.printStackTrace();
            if (e.getSQLState().equals("23000")){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }else{
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@RequestBody CustomerDTO customer,@PathVariable("id") int customerId) {
        try(Connection connection = pool.getConnection()){
            PreparedStatement stm = connection.prepareStatement("UPDATE customer SET name= ?, address = ?, contact_number = ? WHERE id = ?");
            stm.setString(1, customer.getName());
            stm.setString(2, customer.getAddress());
            stm.setString(3, customer.getContactNumber());
            stm.setInt(4,customerId);
            stm.executeUpdate();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (SQLException e){
            if (e.getSQLState().equals("23000")){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            }else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
