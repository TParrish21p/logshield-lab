package com.bizarrestudios.logshieldlab.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DemoRoleGuard {

    public static DemoRole parseRole(String roleHeader) {
        if (roleHeader == null || roleHeader.isBlank()) {
            return DemoRole.VIEWER;
        }

        try {
            return DemoRole.valueOf(roleHeader.trim().toUpperCase());
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown demo role.");
        }
    }

    public static void requireAnyRole(DemoRole actualRole, DemoRole... allowedRoles) {
        List<DemoRole> allowedRoleList = Arrays.asList(allowedRoles);

        if (!allowedRoleList.contains(actualRole)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This demo role cannot perform that action.");
        }
    }

    private DemoRoleGuard() {
    }
}