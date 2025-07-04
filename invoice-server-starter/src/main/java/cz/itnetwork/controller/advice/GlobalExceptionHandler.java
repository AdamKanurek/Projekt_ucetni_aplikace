package cz.itnetwork.controller.advice;

import cz.itnetwork.service.exceptions.DuplicateEmailException;
import cz.itnetwork.service.exceptions.DuplicateIdentificationNumberException;
import cz.itnetwork.service.exceptions.DuplicateInvoiceNumberException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.webjars.NotFoundException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles DuplicateEmailException by returning a BAD_REQUEST response with a relevant error message.
     *
     * @param request the HTTP servlet request
     * @return ResponseEntity containing the error details
     */
    @ExceptionHandler({DuplicateEmailException.class})
        public ResponseEntity<Map <String, Object>> handleDuplicateEmailException(HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Zadaný email již v databázi existuje.", request);
    }

    /**
     * Handles DuplicateIdentificationNumberException by returning a BAD_REQUEST response with a relevant error message.
     *
     * @param request the HTTP servlet request
     * @return ResponseEntity containing the error details
     */
    @ExceptionHandler({DuplicateIdentificationNumberException.class})
    public ResponseEntity<Map <String, Object>> handleDuplicateIdentificationNumberException(HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Zadané IČO již v databázi existuje.", request);
    }

    /**
     * Handles DuplicateInvoiceNumberException by returning a BAD_REQUEST response with a relevant error message.
     *
     * @param request the HTTP servlet request
     * @return ResponseEntity containing the error details
     */
    @ExceptionHandler({DuplicateInvoiceNumberException.class})
    public ResponseEntity<Map <String, Object>> handleDuplicateInvoiceNumberException(HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Zadané číslo faktury již v databázi existuje.", request);
    }


    /**
     * Handles entity not found exceptions.
     *
     * @param ex      the exception
     * @param request the HTTP request
     * @return 404 Not Found
     */
    @ExceptionHandler({NotFoundException.class, EntityNotFoundException.class})
    public ResponseEntity<Map<String, Object>> handleNotFound(Exception ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Požadovaný záznam nebyl nalezen.", request);
    }

    /**
     * Handles incorrect login credentials.
     *
     * @param ex      the exception
     * @param request the HTTP request
     * @return 400 Bad Request with login error message
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Nesprávný e-mail nebo heslo.", request);
    }

    /**
     * Handles validation errors on DTOs (@Size, @NotNull ...).
     *
     * @param ex      the exception
     * @param request the HTTP request
     * @return 400 Bad Request with detailed field validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("status", HttpStatus.BAD_REQUEST.value());
        errorBody.put("error", "Bad Request");
        errorBody.put("message", "Validace selhala.");
        errorBody.put("path", request.getRequestURI());

        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        errorBody.put("errors", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
    }


    /**
     * Handles unauthorized access (when user is not authenticated).
     *
     * @param ex      the exception
     * @param request the HTTP request
     * @return 401 Unauthorized
     */
    @ExceptionHandler(ServletException.class)
    public ResponseEntity<Map<String, Object>> handleServletException(ServletException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Nespravný email nebo heslo.", request);
    }

    /**
     * Handles any unexpected/unhandled exceptions.
     *
     * @param ex      the exception
     * @param request the HTTP request
     * @return 500 Internal Server Error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception ex, HttpServletRequest request) {
        ex.printStackTrace();
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Na serveru došlo k neočekávané chybě.", request);
    }

    // region: Private methods

    /**
     * Helper method to build consistent error response body.
     *
     * @param status  the HTTP status
     * @param message the error message
     * @param request the HTTP request
     * @return formatted error response
     */
    private ResponseEntity<Map<String, Object>> buildErrorResponse(HttpStatus status, String message, HttpServletRequest request) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("status", status.value());
        errorBody.put("error", status.getReasonPhrase());
        errorBody.put("message", message);
        errorBody.put("path", request.getRequestURI());
        return ResponseEntity.status(status).body(errorBody);
    }
}
