package com.dongpo.bmall.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by AlexBob on 2016/1/4.
 */


@RepositoryRestResource(path = "customer")
public interface CustomerRepository extends CrudRepository<Customer,String> {
}
