package it.crm.service;

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
}
