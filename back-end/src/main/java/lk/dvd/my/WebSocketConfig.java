//package lk.dvd.my;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lk.dvd.my.api.CustomerWSHandler;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.config.annotation.EnableWebSocket;
//import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
//import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
//
//@Configuration
//@EnableWebSocket
//public class WebSocketConfig implements WebSocketConfigurer {
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(customerWSHandler(), "/customers-ws");
//    }
//
//    @Bean
//    public CustomerWSHandler customerWSHandler() {
//        return new CustomerWSHandler();
//    }
//
//    @Bean
//    public ObjectMapper objectMapper() {
//        return new ObjectMapper();
//    }
//}
