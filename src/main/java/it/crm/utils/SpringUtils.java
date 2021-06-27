package it.crm.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public final class SpringUtils {

	@Autowired
	private static ApplicationContext context;

	private SpringUtils(ApplicationContext context) {
		SpringUtils.context = context;
	}

	public static <T> T getBean(Class<T> clazz) {
		Assert.state(context != null, "Spring context in the SpringUtil is not been initialized yet!");
		return context.getBean(clazz);
	}
}
