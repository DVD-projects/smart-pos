//package lk.dvd.my.api;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lk.dvd.my.dto.CustomerDTO;
//import org.apache.commons.dbcp2.BasicDataSource;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//public class CustomerWSHandler extends TextWebSocketHandler {
//
//    @Autowired
//    private BasicDataSource pool;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        try (Connection connection = pool.getConnection()) {
//            PreparedStatement stm = connection.prepareStatement("SELECT * FROM customer WHERE id LIKE ? OR  name LIKE ? OR " +
//                    "address LIKE ? OR contact_number LIKE ?");
//            for (int i = 1; i < 5; i++) {
//                stm.setString(i, message.getPayload());
//            }
//            ResultSet rs = stm.executeQuery();
//            if (rs.next()) {
//                int id = rs.getInt("id");
//                String name = rs.getString("name");
//                String address = rs.getString("address");
//                String contactNumber = rs.getString("contact_number");
//                CustomerDTO customer = new CustomerDTO(id, name, address, contactNumber);
//                String customerJson = objectMapper.writeValueAsString(customer);
//                session.sendMessage(new TextMessage(customerJson));
//            }
//        }
//    }
//}
