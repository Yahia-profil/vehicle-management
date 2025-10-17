package com.port.vehiclemanagement.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.IOException;

@RestController
@RequestMapping("/api/plate")
public class PlateDetectionController {

    @PostMapping("/detect")
    public ResponseEntity<String> detectPlate(@RequestParam("file") MultipartFile file) throws IOException {
        String yoloUrl = "http://127.0.0.1:8000/detect-plate/";

        RestTemplate restTemplate = new RestTemplate();

        // Prepare the file as form-data
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(yoloUrl, requestEntity, String.class);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
