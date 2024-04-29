package it.crm.security;

import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClaims;
import io.jsonwebtoken.impl.TextCodec;
import it.crm.security.model.User;

@Component
public class TokenHelper {
	
	@Value("${app.code}")
	private String appName;

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expires_in}")
	private int expires;

	private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
	
	@Autowired
	private ObjectMapper jsonObjectMapper;

	public String getUsernameFromToken(String token) {
		String username;
		try {
			final Claims claims = getClaimsFromToken(token);
			username = claims.getSubject();
		} catch(Exception e) {
			username = null;
		}
		return username;
	}

	public String generateToken(String username) {
		return Jwts.builder().setIssuer(appName).setSubject(username).setIssuedAt(Date.from(Instant.now())).setExpiration(generateExpirationDate()).signWith(SIGNATURE_ALGORITHM, TextCodec.BASE64.encode(secret)).compact();
	}

	
	public String createToken(User user) {
		DefaultClaims claims = new DefaultClaims();
		claims.put("user", user);
		return Jwts.builder().setIssuer(appName).setSubject(user.getUsername()).addClaims(claims).setIssuedAt(Date.from(Instant.now())).setExpiration(generateExpirationDate()).signWith(SIGNATURE_ALGORITHM, TextCodec.BASE64.encode(secret)).compact();
	}

	public Claims getClaimsFromToken(String token) {
		Claims claims;
		try {
			claims = Jwts.parser().setSigningKey(TextCodec.BASE64.encode(secret)).parseClaimsJws(token.substring(token.indexOf(' ')).trim()).getBody();
		} catch(Exception e) {
			claims = null;
		}
		return claims;
	}

	private long getCurrentTimeMillis() {
		return System.currentTimeMillis();
	}

	private Date generateCurrentDate() {
		return new Date(getCurrentTimeMillis());
	}

	private Date generateExpirationDate() {
		return new Date(System.currentTimeMillis() + expires);
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username.equalsIgnoreCase(userDetails.getUsername()) && !(isTokenExpired(token)));
	}
	
	public String refreshToken(String token) {
		Claims claims = getClaimsFromToken(token);
		User user = jsonObjectMapper.convertValue(claims.get("user"), User.class);
		return createToken(user);
	}

	public Date getCreatedDateFromToken(String token) {
		Date created;
		try {
			final Claims claims = getClaimsFromToken(token);
			created = claims.getIssuedAt();
		} catch(Exception e) {
			created = null;
		}
		return created;
	}

	public Date getExpirationDateFromToken(String token) {
		Date expiration;
		try {
			final Claims claims = getClaimsFromToken(token);
			expiration = claims.getExpiration();
		} catch(Exception e) {
			expiration = null;
		}
		return expiration;
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		final Date iat = getCreatedDateFromToken(token);
		return expiration.before(generateCurrentDate()) && (iat.getTime() - generateCurrentDate().getTime()) > expires;
	}

	private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
		return (lastPasswordReset != null && created.before(lastPasswordReset));
	}
	
}