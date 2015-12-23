package com.dongpo.bmall.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by AlexBob on 2015/12/24.
 */

@RepositoryRestResource(path = "goodsPrice")
public interface GoodsPriceRepository extends CrudRepository<GoodsPrice, Integer> {
}
