package com.dongpo.bmall.domain;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by AlexBob on 2015/12/16.
 */
@RepositoryRestResource(path="goods")
public interface GoodsRepository extends PagingAndSortingRepository<Goods, Integer> {
}
