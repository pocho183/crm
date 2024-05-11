package it.crm.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import it.crm.domain.Account;
import it.crm.domain.Company;
import it.crm.enumerator.CompanyType;
import it.crm.enumerator.RoleTypes;
import it.crm.exception.ExceptionContext;
import it.crm.exception.ValidateInputException;
import it.crm.model.AccountModel;
import it.crm.model.CompanyModel;
import it.crm.repository.AccountRepository;
import it.crm.repository.CompanyRepository;
import it.crm.security.model.User;
import it.esinware.mapping.BeanMapper;

@Service
public class AccountService {

	@Autowired
	private BeanMapper mapper;
	@Autowired
	private AccountRepository accountRepository;
	
	public AccountService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}
	
	public List<AccountModel> adminLoadAccounts() {
		List<Account> accounts = accountRepository.findAll();
		// Order by surname by ASC
		accounts.sort((a1,a2) -> a1.getSurname().compareTo(a2.getSurname()));
		return mapper.map(accounts, Account.class, AccountModel.class);
	}
	
	public List<AccountModel> moderatoreLoadAccounts() {
		List<Account> accounts = accountRepository.findAll();
		List<AccountModel> list = mapper.map(accounts, Account.class, AccountModel.class);
		list.removeIf(l -> l.getRole().equals(RoleTypes.ADMIN) || l.getCompany().getCompanyType().equals(CompanyType.CLIENTE));
		// Order by surname by ASC
		list.sort((a1,a2) -> a1.getSurname().compareTo(a2.getSurname()));
		return list;
	}
	
	public List<AccountModel> referenteAziendaLoadAccounts(String company) {
		List<Account> accounts = accountRepository.findByCompany(company);
		List<AccountModel> list = mapper.map(accounts, Account.class, AccountModel.class);
		list.removeIf(l -> l.getRole().equals(RoleTypes.ADMIN) || l.getRole().equals(RoleTypes.MODERATORE));
		// Order by surname by ASC
		list.sort((a1,a2) -> a1.getSurname().compareTo(a2.getSurname()));
		return list;
	}
	
	public AccountModel saveAccount(AccountModel model) {
		Account account = accountRepository.findByEmail(model.getEmail());
		if(account != null) {
			account = mapper.map(model, Account.class);
			if(account.getId() == null)
				throw new ValidateInputException(ExceptionContext.ACCOUNT, "Duplicated Account ! ");
		} else {
			account = new Account();
			account = mapper.map(model, Account.class);
		}
		return mapper.map(accountRepository.save(account), AccountModel.class);
	}	
	
	
	public Account getAccount(User user) {
		Account account = accountRepository.findByEmail(user.getEmail());
		return account;
	}
	
	public void saveLastConnection(Account account) {
		accountRepository.save(account);
	}
	
	public void deleteAccount(AccountModel model, UserDetails account) {
		Optional<Account> accountToDelete = accountRepository.findById(model.getId());
		if(accountToDelete.isPresent()) {
			if(accountToDelete.get().getEmail().equals(account.getUsername()))
				throw new ValidateInputException(ExceptionContext.ACCOUNT, "You cannot delete yourself ! ");
			accountToDelete.get().setDeleteDate(new Date());
			accountRepository.save(accountToDelete.get());
		}
	}
}
