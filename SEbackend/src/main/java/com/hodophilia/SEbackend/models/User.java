package com.hodophilia.SEbackend.models;



import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username") 
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 50)
	@Email
	private String username;
	
	@NotBlank
	@Size(max = 50)
	private String FName;
	
	@NotBlank
	@Size(max = 50)
	private String LName;

	
	@NotBlank
	@Size(max = 120)
	private String password;

	public User() {
	}

	public User(String username, String password,String FName,String LName, Provider provider) {
		this.username = username;
		this.password = password;
		this.FName = FName;
		this.LName = LName;
		this.provider = provider;
	}

	public String getFName() {
		return FName;
	}

	public void setFName(String fName) {
		this.FName = fName;
	}

	public String getLName() {
		return LName;
	}

	public void setLName(String lName) {
		LName = lName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public String getUsername() {
 		return username;
    }

    public void setUsername(String username) {
 		this.username = username;
    }


	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Enumerated(EnumType.STRING)
    private Provider provider;
 
    public Provider getProvider() {
        return provider;
    }
 
    public void setProvider(Provider provider) {
        this.provider = provider;
    }
}
