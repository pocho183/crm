package it.crm.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.crm.domain.Account;
import it.crm.model.AccountModel;
import it.crm.repository.AccountRepository;
import it.esinware.mapping.BeanMapper;


@Service
public class AccountService {

	@Autowired
	private BeanMapper mapper;
	@Autowired
	private AccountRepository accountRepository;
	
	public AccountModel saveAccount(AccountModel model) {
		Account account = mapper.map(model, Account.class);
		return mapper.map(accountRepository.save(account), AccountModel.class);
	}
	
	public List<AccountModel> loadAccounts() {
		List<Account> accounts = accountRepository.findAll();
		// Order by createdAt by DESC
		accounts.sort((a1,a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()));
		return mapper.map(accounts, Account.class, AccountModel.class);
	}
	
	public void deleteAccount(AccountModel model) {
		Optional<Account> account = accountRepository.findById(model.getId());
		if(account.isPresent()) {
			account.get().setDeleteDate(new Date());
			accountRepository.save(account.get());
		}
	}
}
